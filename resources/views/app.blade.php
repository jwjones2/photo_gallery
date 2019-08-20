<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Laravel React Gallery</title>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="stylesheet" href="{{mix('/css/app.css')}}">

    <script>
        function getRandomColor() {
            // from: https://stackoverflow.com/questions/1484506/random-color-generator
            var letters = '0123456789ABCDEF';
            var color = '#';
            for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        }
    </script>
</head>
<body>

<div id="root"></div>

<script src="{{mix('/js/app.js')}}"></script>
</body>
</html>