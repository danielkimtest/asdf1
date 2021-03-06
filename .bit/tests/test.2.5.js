
let uri = undefined
const fetch = require('node-fetch');
const fs = require('fs');
const FormData = require('form-data');

uri = process.env.EMOTIONAL_ENDPOINT

if (uri[0] == null) {
    throw new Error("You have not added your function url as a secret!");
}

(async () => {
    fs.readFile(`${__dirname}/testimage.jpg`, async function(err, content) {
        let formData = new FormData()
        formData.append('data', content, {filename: "testimage.jpeg", type: "image/jpeg", data: content})
        
        const formHeaders = formData.getHeaders();
        
        const resp = await fetch(uri, {
            method: 'POST',
            body: formData,
             headers: {
                ...formHeaders,
              },        
        });
        var result = await resp.text()
        let test = JSON.stringify(result)

        if (test.length < 3) {
            console.log("No response... Try again!")
            process.exit(1)
        } else if (result.includes("media.giphy.com")) {
            console.log("Yay! 🎉 Thanks for the gif!")
        } else {
            console.log("Try again! We didn't get a link to a gif back.")
            process.exit(1)
        }
  })
})();
