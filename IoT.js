const express = require('express'), app = express(), port = 3000, webPush = require('web-push'),
	vapid = {publicKey: 'BMCJ4-mo6WZXBJu3D1YUVMGwTQ4hpVabwZyK7VDjbeoHkff8qGNVZ-C2xbCzoL07MFLfC4zoJ1BLFVMMeqTxJYw', privateKey: 'KD6P6l6839y51I_C8DKQUVJsGhkubKHCVdSHfUSJRuc'};

let messages = [], pushSubscr,
	tick = () => { if (pushSubscr) webPush.sendNotification(pushSubscr, JSON.stringify({msg: 'tick'})).catch(res => console.error('err', res));}

webPush.setVapidDetails('mailto:acherniak@gmail.com', vapid.publicKey, vapid.privateKey);

app.use(express.static('dist'))
app.use(express.json());

app.get('/init', (req, res) => res.send({ pushKey: vapid.publicKey}));

app.post('/push/subscr', (req, res) => {
	pushSubscr = req.body; res.send({message: 'subscribed'})
});

app.get('/api', (req, res) => res.send(messages));

app.put('/api', (req, res) => {
	messages.push(req.body); res.send({message: 'accepted'});	tick();
});

app.delete('/api', (req, res) => {
	messages = []; res.send({message: 'Initialized'}); tick();
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});