<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Form Input LatLng :: demo</title>
        <script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=false"></script>
        <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js"></script>
        <script type="text/javascript" src="FormInputLatlng.js"></script>
        <script type="text/javascript">
            $(function() {
                $.formInputLatlng($('input[name=latlng]')
                        , {mapClass:'inputMap', elemetAddr:$('input[name=addr]')});
            });
        </script>
        <style type="text/css">
            .inputMap { width: 250px; height: 100px}
        </style>
    </head>
    <body>
        <form action="">
            <p>
                <label for="addr">Addr</label>
                 <input type="text" name="addr" />
            </p>
            <input type="text" name="latlng" value="" />
            <p>
                <input type="submit" value="goo"/>
            </p>
            
        </form>
        <div id="cc" style="width: 200px; height: 200px "></div>
    </body>
</html>
