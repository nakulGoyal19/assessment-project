$(document).ready(function(){

    var query = "";

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

        var q = "https://api.github.com/users/"+query+"/repos";
        //console.log(q);
        $.get(q,function(data,status){
             
            // printing repositories of the user
            var p=$('<h1>');
            p.append("Repositories: ");
            p.appendTo("#repos");
            for(var i =0;i<data.length;i++)
            {
                var p=$('<li>');
                var name = data[i].name;
                p.append(name);
                p.appendTo("#repos");
            }
            

        });


        var q1="https://api.github.com/users/"+query;
        $.get(q1,function(data,status){

            // printing user info
             
            var thumbnail = data.avatar_url;
            var img = $('<img id="dynamic" class="float-left img-thumbnail">');

            img.attr("src",thumbnail);

            img.appendTo("#user");

            var p=$('<h2 >');
            var login = data.login;
            p.append("Username: "+ login);
            p.appendTo("#user");

            var p=$('<h4>');
            var login = data.bio;
            p.append("Bio:"+ login);
            p.appendTo("#user");


            var p=$('<p id="followers">');
            var login = data.followers;
            p.append("Followers: "+login);
            p.appendTo("#user");


            var p=$('<p id="following">');
            var login = data.following;
            p.append("Following: "+login);
            p.appendTo("#user");
             
        });
        var q2="https://api.github.com/users/"+query+"/followers";
        $.get(q2,function(data,status){
            for(var i =0;i<data.length;i++)
            {
                var p=$('<li>');
                var name = data[i].login;
                p.append(name);
                p.appendTo("#followers");
            }
            

        });
        var q3="https://api.github.com/users/"+query+"/following";
        console.log(q3);
        $.get(q3,function(data,status){
            for(var i =0;i<data.length;i++)
            {
                var p=$('<li>');
                var name = data[i].login;
                //p.val=name;
                p.append(name);
                p.appendTo("#following");
                console.log(name);
            }
            

        });

        var q4="https://api.github.com/events";
        $.get(q4,function(data,status){
            var p=$('<h4>');
            var num=data[0].actor.login;
            var t=data[0].type;
            p.append("The latest event on git hub is "+t+" Done by user " +num);
            p.appendTo("#events");
            
        });

        var q5="https://api.github.com/emojis";
        console.log(q5);
        $.get(q5,function(data,status){
            $("#emojis").append("Bank emoji:");
            var p=$('<img>');
            var name=data.bank;
            p.attr("src",name);
            p.appendTo("#emojis");

        });
    }

    $("#search").change(function(){
         
        $("#user").empty();
        $("#repos").empty();


    });




});
