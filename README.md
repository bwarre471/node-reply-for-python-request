# node-reply-for-python-request

First you start `node reply.js`
Then you can `node request.js` for like infinite amount of times.
If you have called `node request.js` it maybe fails if you call `python request.py`.
If you call `python request.py` twice, it'll fail for sure.

Therefore I wonder if it's that Node.js writes different response for that connection, or what it is.
