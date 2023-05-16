const main = document.querySelector("#main");
const qna = document.querySelector("#qna")
const result = document.querySelector("#result")
const endPoint = 12;
const select =[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,];

function calResult(){
    var result = select.indexOf(Math.max(...select)) // 소괄호 안에있는 select값의 max 값을 찾아주며 그것의 인덱스를 지정
    console.log(result);
    return result;
}

function setResult(){
    let point = calResult();
    const resultName = document.querySelector(".resultname");
    resultName.innerHTML = infoList[point].name;

    var resultImg = document.createElement('img');
    const imgDiv = document.querySelector("#resultImg");
    var imgURL = 'img/image-' + point + '.png';
    resultImg.src = imgURL;
    resultImg.alt = point;
    resultImg.classList.add('img-fluid');
    imgDiv.appendChild(resultImg);

    const resultDesc = document.querySelector(".resultDesc")
    resultDesc.innerHTML = infoList[point].desc;
}

function goResult(){
    qna.style.WebkitAnimation = "fadeOut 1s";
    qna.style.animation = "fadeOut 1s";
    setTimeout(() => {
        result.style.WebkitAnimation = "fadeIn 1s";
        result.style.animation = "fadeIn 1s";
        setTimeout(()=>{
            qna.style.display = "none";
            result.style.display = "block";
        },450)
    }, 450)
    console.log(select);
    setResult();
}

function addAnswer(answerText, qIdx, idx){
    var a = document.querySelector('.answerBox');
    var answer = document.createElement('button'); //createElement('html tag요소') : 지정한 html 요소를 만들어 반환
                                    // 즉 html tag 요소인 button을 answer이라는 변수에 지정함, answer라는 변수는 버튼을 의미함
    answer.classList.add('answerButtonlist'); // 클래스 이름 지정
    answer.classList.add("my-3");
    answer.classList.add("py-3");
    answer.classList.add("mx-auto");
    answer.classList.add("fadeIn");

    // answer.classList.add("fadeOut");
    a.appendChild(answer); //answer라는 버튼이 a에게 소속될 수있도록 관계를 만듬 
                            //(a에는 answerBox의 div태그를 가지고 있고, 그 내부에 button이라는 태그가 들어가있는 것)
    answer.innerHTML =answerText;

    answer.addEventListener("click", function(){ //answer이라는 버튼에 이벤트를 추가함 (버튼을 누르면 다음 질문이 나오도록)
        // 먼저 처음 질문의 답을 누르면 그 처음 질문의 버튼들을 모두 안보이게 하기 
        // children이라는 변수에 버튼 3개를 다 담으려고하는 과정
        // 이 버튼들은 class나 id값이 없어서 querySelector로 선택할 수가 없음 -> class 값을 넣어줘야함
        var children = document.querySelectorAll('.answerButtonlist');
        for(let i =0; i< children.length; i++){
            children[i].disabled = true;
            children[i].style.WebkitAnimation = "fadeOut 0.5s";
            children[i].style.animation = "fadeOut 0.5s";
        }
        setTimeout(()=>{
            var target = qnaList[qIdx].a[idx].type;
            for(let i=0; i<target.length; i++){
                select[target[i]] += 1;
            }
            for(let i =0; i< children.length; i++){
            children[i].style.display = 'none';
            }
            goNext(++qIdx);
        },950)
    }, false);
}

function goNext(qIdx){
    if(qIdx===endPoint){
        goResult();
    }
    var q = document.querySelector('.qBox');
    q.innerHTML = qnaList[qIdx].q;    
    //innerHTML이란 요소 내 포함된 html 또는 xml마크업을 가져오거나 설정함
    // 즉 qnaList의 idx 요소의 q를 html의 qBox라는 class 이름을 갖고있는 div태그에 넣어주는(할당해줌) 것
    for(let i in qnaList[qIdx].a){
        addAnswer(qnaList[qIdx].a[i].answer, qIdx, i);
    }
    var status = document.querySelector(".statusBar");
    status.style.width = (100/endPoint)*(qIdx+1) + '%';
}


function begin()
{
    main.style.WebkitAnimation = "fadeOut 1s";
    main.style.animation = "fadeOut 1s";
    setTimeout(() => {
        qna.style.WebkitAnimation = "fadeIn 1s";
        qna.style.animation = "fadeIn 1s";
        setTimeout(()=>{
            main.style.display = "none";
            qna.style.display = "block";
        },450)
        let qIdx =0
        goNext(qIdx);
    }, 450)
    // main.style.display = "none";
    // qna.style.display = "block";
}
