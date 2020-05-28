<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Laravel with Vue</title>
        <link rel="stylesheet" href="./css/all.css">

    </head>
    <body>
    <div id="app">
     <mainapp></mainapp>
    </div>
    </body>
    <script>
    (function(){
        window.Laravel = {
            csrfToken:'{{csrf_token()}}'
        };
    })();
    </script>
    <!-- <script src="{{asset('js/app.js')}}"></script> -->
    <script src="{{mix('js/app.js')}}"></script>
</html>
