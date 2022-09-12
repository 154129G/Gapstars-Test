var express = require('express');
var router = express.Router();
const axios = require('axios');
let fs = require('fs');


router.post('/', async  function(req, res, next) {
  const data1 = req.body.data[0];
  const data2 = req.body.data[1];
  let imageArray = [];
    
      try {

        const url1 = data1.imageUrl + data1.text + '?width=' + data1.width + '&height=' + data1.height + '&color' + data1.color + '&s=' + data1.size;
          const response1 = await axios.get(url1, { responseType: 'arraybuffer' });
          imageArray.push({buffer1:response1.data})
          const url2 = data2.imageUrl + data2.text + '?width=' + data2.width + '&height=' + data2.height + '&color' + data2.color + '&s=' + data2.size;
          
          const response2 = await axios.get(url2 , { responseType: 'arraybuffer' });
          imageArray.push({buffer2:response2.data })
        
        fs.writeFile('./newImage.json' , JSON.stringify({data:imageArray }), err => {
          if(err){
            console.log(err);
          }else{
            res.send( "File written successfully");
          }
        })
      
      } catch (error) {
        console.error(error);
      }
});



module.exports = router;
