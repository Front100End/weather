const ChangeMainData = "changeMainLocation";
const AddLocalData = "addLocalData";
const SetMainLocationData = "SetMainLocationData";
const SetLocalLocationData = "SetLocalLocationData";

export const changeMainLocation = (data) => ({
  type: ChangeMainData,
  data: data,
});

export const setMainLocationData = (data) => ({
  type: SetMainLocationData,
  data: data,
});

export const setLocalLocationData = (data) => ({
  type: SetLocalLocationData,
  data: data,
});

const initState = {
  mainLocation: [],
  localLocation: [
    // {
    //   name: "서울특별시",
    //   lat: 37.5683,
    //   lon: 126.9778,
    // },
    // {
    //   name: "부산광역시",
    //   lat: 35.1028,
    //   lon: 129.0403,
    // },
  ],
  mainLocationData: [],
  localLocationData: [],
};
export default function weatherReducer(state = initState, action) {
  let tempState = { ...initState };
  switch (action.type) {
    case ChangeMainData: {
      console.log(action.data);
      return {
        ...state,
        mainLocationData: action.data,
      };

      //   // mainLocation: {
      //   //   name: action.name,
      //   //   lat: action.lat,
      //   //   lon: action.lon,
      //   // },
      // };
    }
    case SetMainLocationData: {
      let data = action.data;
      return {
        ...state,
        mainLocationData: state.mainLocationData.concat(data),
        mainLocation: {
          name: action.data.name,
          lat: action.data.lat,
          lon: action.data.lon,
        },
      };
    }
    case SetLocalLocationData: {
      let data = action.data;
      return {
        ...state,
        localLocationData: state.localLocationData.concat(data),
      };
    }

    default:
      return state;
  }
}
