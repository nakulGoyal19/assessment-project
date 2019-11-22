$(document).ready(function(){

    const client_id = "836e241889ae2053321dd68ef09e6859ef94576c768c453b1feeda765a52048c";

    var query = "";

    var page = 1;

    // binding a event listener on the form

    $("#form").submit(function(){

        // collection value submitted by user

        query = $("#search").val();

        makeCall(query);

        return false; // it prevents auto submission of the form this line is very important

    });


    function makeCall(query)
    {
        // making a AJAX call to the api

        var q = "https://api.unsplash.com/search/collections?&client_id="+client_id+"&page="+page+"&query="+query;

        $.get(q,function(data,status){
             
             // detect the length of the array
             //console.log(data);

             var length = data.results.length;

             if(length == 0)
             {
                 alert("no results found");
             }
             else{
                 for(var i =0;i<length;i++)
                 {
                     // getting the thumbnail of the image

                    var thumbnail = data.results[i].cover_photo.urls.small;
                   
                    // getting the downloaded url of the image

                    var downloadUrl = data.results[i].cover_photo.links.download;

                    var img = $('<img id="dynamic" class="float-left img-thumbnail">');

                    img.attr("src",thumbnail);

                    img.appendTo("#photos");

                    img.click(function(){
                         
                        window.open(downloadUrl,"_blank");


                    });
                 }

                 page = page + 1 ;
             }

        });

        $(window).scroll(function() {
            if($(window).scrollTop() + $(window).height() == $(document).height()) {
                makeCall(query);
            }
         });
    }

    $("#search").change(function(){
         
        $("#photos").empty();


    });




});
