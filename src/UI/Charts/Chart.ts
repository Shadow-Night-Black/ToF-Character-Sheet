import { ChartPoint } from "chart.js";
import Color from "color";

export function Dataset(data:ChartPoint[], {label = '', colour = Color("red")} = {}):Chart.ChartDataSets {
    return {
        label:label,
        borderColor:colour.toString(),
        fill:false,
        showLine:true,
        data:data,
        cubicInterpolationMode: "monotone"
    }
}