$(function(){
    // Wrap your File input in a wrapper <div>
    var wrapper = $('<div/>').css({height:0,width:0,'overflow':'hidden'});
    var fileInput = $(':file').wrap(wrapper);

    // When your file input changes, update the text for your button
    fileInput.change(function(){
        $this = $(this);
        // If the selection is empty, reset it
        if($this.val().length == 0) {
            $('#file').text("Your Text to Choose a File Here!");
        }else{
            $('#file').text($this.val());
        }
    })

    // When your fake button is clicked, simulate a click of the file button
    $('#file').click(function(){
        fileInput.click();
    }).show();
});