const http=require('http');

const app=http.createServer((req,res)=>{

    res.setHeader('Content-Type','text/html');

    if(req.url==='/home'){
        res.end('<h1>Welcom home</h1>');
    }else if(req.url==='/about'){
        res.end('<h1>Welcome to about us</h1>');

    }
    else if(req.url==='/node'){
        res.end('<h1>Welcome to my Node js project</h1>');

    }else{
        res.end('<h1>Page Not Found</h1>');

    }

});
app.listen(3000,()=>{
    console.log('Server is running on port 3000');
});
