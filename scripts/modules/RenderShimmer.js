export function RenderShimmer(numberOfShimmers, shimmerNode){
    const fragment = document.createDocumentFragment();
    for(let i=1; i <= numberOfShimmers; i++ ){
        const shimmerCard = document.createElement('div');
        shimmerCard.classList.add('card', 'br');
        const wrapper = document.createElement('div');
        wrapper.classList.add('wrapper');
        const rightPart = document.createElement('div');
        const leftPart = document.createElement('div');
        const profilePic = document.createElement('div');
        profilePic.classList.add('profile-pic', 'animate');
        leftPart.appendChild(profilePic);
        const emailHeaderFrom = document.createElement('div');
        emailHeaderFrom.classList.add('comment', 'br', 'animate', 'w70');
        const emailSubject = document.createElement('div');
        emailSubject.classList.add('comment', 'br', 'animate', 'w70');
        const emailDescription = document.createElement('div');
        emailDescription.classList.add('comment', 'br', 'animate');
        const emailDate = document.createElement('div');
        emailDate.classList.add('comment', 'br', 'animate', 'w70');
        leftPart.classList.add('left-part-email');
        rightPart.classList.add('right-part-email');
        rightPart.appendChild(emailHeaderFrom);
        rightPart.appendChild(emailSubject);
        rightPart.appendChild(emailDescription);
        rightPart.appendChild(emailDate);
        wrapper.appendChild(leftPart);
        wrapper.appendChild(rightPart);
        shimmerCard.appendChild(wrapper);
        fragment.appendChild(shimmerCard);
    }
    shimmerNode.appendChild(fragment);
    return shimmerNode;
}

export function toggleClassOnShimmer(cssClass, shimmer){
    if(cssClass === 'remove'){
        shimmer.classList.remove('show');
        shimmer.classList.add('hide');
    }else{
        shimmer.classList.remove('hide');
        shimmer.classList.add('show');
    }
}