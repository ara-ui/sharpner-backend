const http=require('http');
const fs=require('fs');


const server=http.createServer((req,res)=>{

   const url=req.url;
    const method=req.method;

    if(req.url==='/'){

        res.setHeader('Content-Type','text/html');

        res.end(`<form action="/message" method="POST">
            <label>Message:</label>
            <input type="text" name="msg">
            <br>
            <button type="submit">Submit</button>
        </form>`);

    }else if(req.url==='/message'&& req.method==='POST'){

            res.setHeader('Content-type','text/html');

            let dataChunks=[];
            req.on('data',(chunks)=>{
                
                dataChunks.push(chunks);
                
            });
            req.on('end',()=>{
                const parsedBody=Buffer.concat(dataChunks).toString();
                
                console.log(parsedBody);

                const formData=parsedBody.split('&')[0].split('=')[1];
    
                fs.writeFile('formvalues.txt',formData,(err)=>{
                    if(err){
                        console.log(err);
                    }
                    res.statusCode=302;
                    res.setHeader('Location','/');
                    res.end();
                });
                
            });
        
            
        }else if(req.url === '/read'){

    fs.readFile('formvalues.txt',(err,data)=>{

        if(err){
            return res.end('No data found');
        }

        res.setHeader('Content-Type','text/html');

        res.end(`
            <h1>${data.toString()}</h1>
        `);

    });

}else{
    res.statusCode = 404;
    res.end('Page Not Found');
}  
        
        
});

server.listen(3000,()=>{
    console.log('Server is running ');
})