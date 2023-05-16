const url ='https://lovetypechecktest.netlify.app/';
function setShare() {
    var resultImg = document.querySelector('#resultImg');
    var resultAlt = resultImg.firstElementChild.alt;
    const shareTitle ='십이간지 연애유형 결과';
    const shareDesc = infoList[resultAlt].name;
    const shareImage = url + 'img/image-' + resultAlt +'.png';
    const shareURL = url + 'paper/result-' + resultAlt +'.html';

    Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title: shareTitle,
          description: shareDesc,
          imageUrl: shareImage,
          link: {
            // [내 애플리케이션] > [플랫폼] 에서 등록한 사이트 도메인과 일치해야 함
            mobileWebUrl: shareURL,
            webUrl: shareURL,
          },
        },
        buttons: [
          {
            title: '결과 확인하기',
            link: {
              mobileWebUrl: shareURL,
              webUrl: shareURL,
            },
          },
        ],
      });
}
