

```bash
npm install eksisozlukjs
```

```javascript
const eksisozluk = require("eksisozlukjs");
eksisozluk.getEntry("pena",function(result){
    console.log("author: " + result[0].author);
    //=> ssg

    console.log("entry: " + result[0].text); 
    //=> gitar calmak icin kullanilan minik plastik garip nesne. 
})
```