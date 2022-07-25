const Rain = "Rain";
const Snow = "Snow";
const Drizzle = "Drizzle";
const Thunderstorm = "Thunderstorm";
const Clouds = "Clouds";
const Clear = "Clear";

export const speechBubble = (mainWeatherData, speech, advice) => {
  console.log(mainWeatherData);
  let weatherType = mainWeatherData.daily[0].weather[0].main;
  console.log(weatherType);
  let hourlyData = mainWeatherData.hourly.splice(1, 10);

  if (weatherType === "Rain") {
    for (let i = 0; i < 10; i++) {
      //비가 40퍼센트 이상 올 경우에만 비오는 것으로 확정
      if (hourlyData[i].pop >= 0.4) {
        console.log("40퍼센트 이상");
        weatherType = "Rain";
        break;
      } else {
        weatherType = "Clouds";
      }
    }
  }

  switch (weatherType) {
    case Rain: {
      speech(`오늘은 비가 내릴 예정이에요`);
      advice(`우산 꼭! 챙겨가요.`);
      break;
    }
    case Snow: {
      speech(`오늘은 눈이 내릴 예정이에요`);
      advice(`따뜻하게 입고 나가야해요!`);
      break;
    }
    case Drizzle: {
      speech(`오늘은 이슬비가 내릴 예정이에요`);
      advice(`우산은 필요없어도 따뜻하게 입구 나가야해요.`);
      break;
    }
    case Thunderstorm: {
      speech(`천둥번개가 칠 예정이에요`);
      advice(`오늘은 집 콕!`);
      break;
    }
    case Clouds: {
      speech(`오늘은 날이 흐려질 예정이에요`);
      advice(`그래도 기분좋게 아자!`);
      break;
    }
    case Clear: {
      speech(`맑은 날씨, 기분 좋은 날씨에요:)`);
      advice(`오늘도 화이팅`);
      break;
    }
    default:
      return;
  }
  //   // let hourly = props.mainWeatherData.hourly.slice(1, 19);
  //   // hourly.forEach((current, idx) => {
  //   //   if (current.pop >= 0.4) {
  //   //     setSpeech(`오늘은 비가 내릴 예정이에요`);
  //   //     setAdvice(`우산 꼭! 챙겨가요.`);
  //   //   }
  //   // });
  // };
};
