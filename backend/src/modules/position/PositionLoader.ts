import Position from "./PositionModel";

const positionLoader = async (id: string) => {
    const positionFinded = await Position.findOne({_id: id});
    return positionFinded;
};

export default positionLoader