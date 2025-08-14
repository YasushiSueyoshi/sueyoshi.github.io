'use strict';

// geolocation
function success(pos) {
  ajaxRequest(pos.coords.latitude, pos.coords.longitude);
}

function fail(error) {
  alert('位置情報の取得に失敗しました。エラーコード：' + error.code);
}

navigator.geolocation.getCurrentPosition(success, fail);

// UTCをミリ秒に
function utcToJSTime(utcTime) {
  return utcTime * 1000;
}

// データ取得
function ajaxRequest(lat, long) {
    const url = 'https://api.openweathermap.org/data/2.5/forecast';
    const appId = '7b10c29b0cb927eb544c9b142538ca44'
    $.ajax({
      url: url,
      data: {
        appid: appId, // API key
        lat: lat, // 緯度
        lon: long,  // 経度
        units: 'metric', //データの単位を設定。値を'metric'にすると、メートル法、摂氏（℃）のデータを取得できる
        lang: 'ja' //言語設定
      }
    })
    .done(function(data) {
      console.log(data);

      // 都市名、国名
      $('#place').text(data.city.name + ',' + data.city.country);

      // 天気予報データ
      data.list.forEach(function (forecast, index) {
        const dateTime = new Date(utcToJSTime(forecast.dt));
        const month = dateTime.getMonth() + 1;
        const date = dateTime.getDate();
        const hours = dateTime.getHours();
        const min = String(dateTime.getMinutes()).padStart(2, '0'); //
        const temperature = Math.round(forecast.main.temp); //気温を小数点以下を四捨五入
        const description = forecast.weather[0].description; //天気の説明
        const iconPath = `images/${forecast.weather[0].icon}.svg`; //アイコン画像

        // 現在の天気とそれ以外で出力を変える
        if (index === 0) {
          const currentWeather = `
          <div class="icon"><img src="${iconPath}"></div>
          <div class="info">
            <p>
              <span class="description">現在の天気:${description}</span>
              <span class="temp">${temperature}</span>℃
            </p>
          </div>`;
          $('#weather').html(currentWeather);
        } else {
          const tableRow = `
          <tr>
            <td class="info">
            ${month}/${date} ${hours}:${min}
            </td>
            <td class="icon"><img src="${iconPath}"></td>
            <td><span class="description">${temperature}℃</span></td>
          </tr>`;
          $('#forecast').append(tableRow);
        }





      });
    })
    .fail(function () {
      console.log('$.ajax failed!');
  })
}