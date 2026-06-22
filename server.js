const http=require('http');

const server=http.createServer((req,res)=>{

    const url=req.url;
    const method=req.method;

    if(req.url==='/'){

        res.setHeader('Content-Type','text/html');

        res.end(`<form action="/message" method="POST">
            <label>Name:</label>
            <input type="text" name="username">
            <br>
            <label>Email:</label>
            <input type="email" name="useremail">
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
                console.log("Received data");
                console.log(parsedBody);

                const formData=parsedBody.split('&');

                console.log(formData);

                res.statusCode=302;
                res.setHeader('Location','/');
                res.end();
            });
        }else{
            res.statusCode=404;
            res.setHeader('Content-Type','text/html');
            res.end('<h1>Page Not Found</h1>');
        }
});

server.listen(3000,()=>{
    console.log('Server is running ');
})