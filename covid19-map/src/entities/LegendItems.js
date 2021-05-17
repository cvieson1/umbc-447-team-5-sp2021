import LegendItem from "./LengendItem";

var legendItems = [
  new LegendItem(
    "10000 +",
    "#741f1f",
    // "#8b0000",
    (cases) => cases >= 10000,
    "white"
  ),

  new LegendItem(
    "5001 - 10000",
    // "#741f1f",
    "#9c2929",
    (cases) => cases >= 5001 && cases < 10001,
    "White"
  ),

  new LegendItem(
    "2501 - 5000",
    "#c57f7f",
    (cases) => cases >= 2501 && cases < 5001
  ),

  new LegendItem(
    "1001 - 2500",
    "#d8aaaa",
    (cases) => cases >= 1001 && cases < 2501 //>= 50_000 && cases < 200_000
  ),

  new LegendItem(
    "0 - 1000", //"0 - 49,999",
    "#ebd4d4",
    (cases) => cases >= 0 && cases < 1001//> 0 && cases < 50_000
  ),

  new LegendItem("Number of Cases", "#ffffff", (cases) => true),
];

export default legendItems;

/**
 * 7 > 1 million                        #8b0000
 * 6 >= 500 thousand < 1 million        #9e2a2a
 * 5 >= 200 thousand < 500 thousand     #b15555
 * 4 >= 100 thousand  < 200 Thousand    #c57f7f
 * 3 > 50 thousand < 100 thousand       #d8aaaa
 * 2 >= 0 < 50 thousand                 #ebd4d4
 * 1 NO DATA                            #ffffff
 */

/*

#741f1f // Really red
#9c2929 // more red
#c57f7f // red
#d8aaaa //more pink
#ebd4d4 //pink
#ffffff //white
*/
