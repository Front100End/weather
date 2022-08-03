import springImage from "../component/image/cat_spring_ver.png";
import summerImage from "../component/image/cat_summer_ver.png";
import authmnImage from "../component/image/cat_authmn_ver.png";
import winterImage from "../component/image/cat_winter_ver.png";
import snowImage from "../component/image/winter.png";
import rainImage from "../component/image/snow.png";
export const backgroundSelect = (setBackground, mainWeatherData) => {
  let time = new Date();
  let type = time.getMonth() + 1;

  let hourlyData = mainWeatherData.hourly.slice(1, 9);
  // 8시간 기준으로 비가 유무에 따라 이미지 변경
  for (let i = 0; i < 8; i++) {
    //비가 40퍼센트 이상 올 경우에만 비오는 것으로 확정
    if (hourlyData[i].pop >= 0.4) {
      type = "rain";
      break;
    }
  }

  switch (type) {
    case (3, 4, 5): {
      setBackground(springImage);
      break;
    }
    case (6, 7, 8): {
      setBackground(summerImage);
      break;
    }
    case (9, 10, 11): {
      setBackground(authmnImage);
      break;
    }

    case (12, 1, 2): {
      setBackground(winterImage);
      break;
    }
    case "snow": {
      setBackground(snowImage);
      break;
    }
    case "rain": {
      setBackground(rainImage);
      break;
    }
    default:
      return;
  }
};
