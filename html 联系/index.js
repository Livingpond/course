const newDiv = document.createElement('div')
newDiv.innerHTML = '我是新创建的div'

const root = document.getElementById('root')
root.appendChild(newDiv);



const newDiv2 = document.createElement('div');
newDiv2.innerHTML = 0;

newDiv2.addEventListener('click', () => {
    newDiv2.innerHTML = parseInt(newDiv2.innerHTML, 10) + 1;
});

root.appendChild(newDiv2);


