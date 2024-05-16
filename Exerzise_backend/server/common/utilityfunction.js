const utilityFunctions = () => {
  //  user, coach
  const generateBookingID = async (date, timeS, timeE) => {
    const convertDate = (date) => {
      console.log(date);
      const dateresult = date.split(" ");
      return dateresult;
    };
    const dateformat = await convertDate(date);
    const convertTime = (timeS, timeE) => timeS.split(":") + timeE.split(":");

    // const result = `111123123`;
    const result = `${dateformat}${convertTime(timeS, timeE)}`;
    return result;
  };

  return { generateBookingID };
};

module.exports = utilityFunctions;
