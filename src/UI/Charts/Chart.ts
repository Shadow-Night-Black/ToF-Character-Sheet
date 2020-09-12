import { ChartPoint } from "chart.js";
import { Colour } from "./Colours";

export function Dataset(data:ChartPoint[], {label = '', colour = Colour.red} = {}):Chart.ChartDataSets {
    return {
        label:label,
        borderColor:colour,
        fill:false,
        showLine:true,
        data:data,
        cubicInterpolationMode: "monotone"
    }
}