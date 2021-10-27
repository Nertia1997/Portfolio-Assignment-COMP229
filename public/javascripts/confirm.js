(function(){

    function Start()
    {
        let deleteButtons = document.querySelectorAll('.contactBtns')

        for(button of deleteButtons){
            button.addEventListener('click', (event)=>{
                if(!confirm("Are you sure?")){
                    event.preventDefault();
                    window.location.assign('/contact-list');
                }
            });
        }
    }

    window.addEventListener("load", Start);
})();