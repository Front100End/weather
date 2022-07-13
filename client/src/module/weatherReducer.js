const ChangeMainData = "changeMainLocation";
const AddLocalData = "addLocalData";
const AddTemp = "AddTemp";

export const changeMainLocation = (name, lat, lon) => ({
  type: ChangeMainData,
  name: name,
  lat: lat,
  lon: lon,
});

export const addTemp = (data) => ({
  type: AddTemp,
  data: data,
});

const initState = {
  mainLocation: { name: "경기도 안산시", lat: 37.3236, lon: 126.8219 },
  localLocation: [
    {
      name: "서울특별시",
      lat: 37.5683,
      lon: 126.9778,
    },
    {
      name: "부산광역시",
      lat: 35.1028,
      lon: 129.0403,
    },
  ],
  temp: [],
};
export default function weatherReducer(state = initState, action) {
  let tempState = { ...initState };
  switch (action.type) {
    case ChangeMainData: {
      return {
        tempState,
        mainLocation: {
          name: action.name,
          lat: action.lat,
          lon: action.lon,
        },
      };
    }
    case AddLocalData: {
      return {
        tempState,
        localLocation: [
          ...{ name: action.name, lat: action.lat, lon: action.lon },
        ],
      };
    }
    case AddTemp: {
      return {
        tempState,
        temp: [...{ data: action.data }],
      };
    }
    default:
      return state;
  }
}
