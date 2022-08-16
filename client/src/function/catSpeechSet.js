const Rain = "Rain";
const Snow = "Snow";
const Drizzle = "Drizzle";
const Thunderstorm = "Thunderstorm";
const Clouds = "Clouds";
const Clear = "Clear";

export const speechBubble = (
  mainWeatherData,
  speechCurrent,
  speech,
  advice
) => {
  let hourWeatherType = mainWeatherData.daily[0].weather[0].main;
  let CurrentWeatherType = mainWeatherData.current.weather[0].main;
  let hourlyData = mainWeatherData.hourly.slice(1, 9);
  let RainStopTime = 0;
  let RainstartTime = 0;
  speech("");
  advice("");
  speechCurrent("");

  // 현재 비가 온다면 멈추는 비가 멈추는 시간 계산
  if (CurrentWeatherType === Rain) {
    for (let i = 0; i < 8; i++) {
      if (hourlyData[i].pop < 0.4) {
        RainStopTime = i + 1;
        break;
      }
    }
  }
  if (CurrentWeatherType === Snow) {
    for (let i = 0; i < 8; i++) {
      if (hourlyData[i].pop < 0.4) {
        RainStopTime = i + 1;
        break;
      }
    }
  }
  for (let i = 0; i < 8; i++) {
    //비가 40퍼센트 이상 올 경우에만 비오는 것으로 확정
    //추후 8시간동안 비가 올 예정인지를 확인, 온다면 stop시간 확인.
    if (hourlyData[i].pop >= 0.4) {
      hourWeatherType = Rain;
      if (mainWeatherData.daily[0].weather[0].main === Snow) {
        hourWeatherType = Snow;
      }
      RainstartTime = i + 1;
      break;
    } else {
      hourWeatherType = mainWeatherData.daily[0].weather[0].main;
      // 이후 비가 40퍼센트가 넘지 않는데 데이터가 Rain이나 Snow라면 cloud로 확인.
      if (hourWeatherType === (Rain || Snow)) {
        hourWeatherType = Clouds;
      }
    }
  }

  if (CurrentWeatherType === Clear) {
    speechCurrent(`현재 날씨는 맑아요.`);
    advice(`오늘도 화이팅`);
  } else if (CurrentWeatherType === Clear && hourWeatherType === Rain) {
    speechCurrent(`현재 날씨는 맑지만`);
  } else if (CurrentWeatherType === Clear && hourWeatherType === Clear) {
    speechCurrent(`오늘은 내내 맑을 예정이에요`);
    speech(`기분 좋은 날씨네요:)`);
    advice(`오늘도 화이팅`);
    return;
  } else if (CurrentWeatherType === Thunderstorm) {
    speechCurrent(``);
    speech(`으악! 천둥번개가 치고있어요`);
    advice(`오늘은 집 콕!`);
    return;
  } else if (CurrentWeatherType === Clouds) {
    speechCurrent(`지금은 구름이 많고 흐려요`);
    advice(`그래도 기분좋게 아자!`);
    if (RainstartTime === 0) {
      return;
    }
  } else if (CurrentWeatherType === Drizzle) {
    speechCurrent("이슬비가 내리고있어요");
    speech(`${RainStopTime}시간 후에 비가 그칠 예정이랍니다.`);
    advice("우산 꼭! 챙겨가요.");
    return;
  } else if (CurrentWeatherType === Rain) {
    speechCurrent("지금 비가 내리고있어요!");
    speech(`${RainStopTime}시간 후에 비가 그칠 예정이랍니다.`);
    if (RainStopTime === 0) {
      speech(`오늘은 비가 계속 내릴 것 같아요`);
    }
    advice("우산 꼭! 챙겨가요.");
    return;
  } else if (CurrentWeatherType === Snow) {
    speechCurrent("지금 눈이 내리고있어요!");
    speech(`${RainStopTime}시간 후에 눈이 그칠 예정이랍니다.`);
    if (RainStopTime === 0) {
      speech(`오늘은 눈이 계속 내릴 것 같아요`);
    }
    advice("우산 꼭! 챙겨가요.");
    return;
  }

  // hourly Weather choose;

  if (CurrentWeatherType !== hourWeatherType) {
    switch (hourWeatherType) {
      case Rain: {
        speech(`${RainstartTime}시간 후에 비가 내릴 확률이 크대요`);
        advice(`우산 꼭! 챙겨가요.`);
        break;
      }
      case Snow: {
        speech(`눈이 내릴 확률이 크대요`);
        advice(`따뜻하게 입고 나가야해요!`);
        break;
      }
      case Drizzle: {
        speech(`오늘은 이슬비가 내릴 예정이에요`);
        advice(`우산은 필요없어도 따뜻하게 입구 나가야해요.`);
        break;
      }
      case Clouds: {
        speech(`그치만 날이 흐려질 수 있다고 하네요`);
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
  }
};
