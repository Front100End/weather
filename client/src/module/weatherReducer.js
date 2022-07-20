const ChangeMainData = "changeMainLocation";
const SetMainLocationData = "SetMainLocationData";
const SetLocalLocationData = "SetLocalLocationData";
const DeleteLocalLocationData = "DeleteLocalLocationData";

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
export const deleteLocalcationData = (data) => ({
  type: DeleteLocalLocationData,
  data: data,
});

const initState = {
  mainLocation: [],
  localLocation: [],
  mainLocationData: [],
  localLocationData: [],
};
export default function weatherReducer(state = initState, action) {
  switch (action.type) {
    case ChangeMainData: {
      state.mainLocationData[0] = action.data;
    }
    case SetMainLocationData: {
      return {
        ...state,
        mainLocationData: state.mainLocationData.concat(action.data),
      };
    }
    case SetLocalLocationData: {
      return {
        ...state,
        localLocationData: state.localLocationData.concat(action.data),
      };
    }
    case DeleteLocalLocationData: {
      return {
        ...state,
        localLocationData: state.localLocationData.filter(
          (current) => current.id !== action.data
        ),
      };
    }

    default:
      return state;
  }
}
