# molip-backend

Using MongoDB

## DB STRUCTURE
- ACCOUNT TABLE
:: userID, userName, userMail
- PAGE TABLE
:: pid, pemoji, ptitle, pcontents, (parentsPID), (phistory), (accessAvailable)

## API & ENDPOINT

### /pages
- GET /pages
- GET /pages/:pageId
- POST /pages
- PUT /pages/:pageId
- DELETE /pages/:pageId