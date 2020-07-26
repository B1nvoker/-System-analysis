console.clear();
var superstring

function read(){
  var string_of_all_elements
  var file = document.getElementById("file").files[0]
  var reader = new FileReader();

  console.log("Starting reading file...")

  reader.readAsText(file)
  reader.onload = function()
  {
    console.log("File readed!")
    document.getElementById('filelabel').innerHTML = "File downloaded"
    string_of_all_elements = String(reader.result)
    superstring = string_of_all_elements
  }
  document.getElementById('out').innerHTML = "File readed, press Make! to see a chart."
}

function getArrayOfAllElements(){

  var arr_of_all_elements = superstring.split("  ").map(Number)
  return arr_of_all_elements
}

function getArrayOfX(){

  var arr_of_x_elements = [], arr_of_all_elements = getArrayOfAllElements()
  for (var i = 1, j = 0; i < arr_of_all_elements.length; i += 8) {
    arr_of_x_elements[j] = arr_of_all_elements[i]
    j++
  }
  return arr_of_x_elements
}

function getArrayOfY(){

  var arr_of_y_elements = [], arr_of_all_elements = getArrayOfAllElements()
  for (var i = 2, j = 0; i < arr_of_all_elements.length; i += 8) {
    arr_of_y_elements[j] = arr_of_all_elements[i]
    j++
  }
  return arr_of_y_elements
}

function getSumOfXElements(){

  var sum_x = 0, arr_of_x_elements = getArrayOfX()
  for (var i = 0; i < arr_of_x_elements.length; i++) {
    sum_x += arr_of_x_elements[i]
  }
  return sum_x
}

function getSumOfYElements(){

  var sum_y = 0, arr_of_y_elements = getArrayOfY()
  for (var i = 0; i < arr_of_y_elements.length; i++) {
    sum_y += arr_of_y_elements[i]
  }
  return sum_y
}

function getMultOfXElements(){

  var sum_xx = 0, arr_of_x_elements = getArrayOfX()
  for (var i = 0; i < arr_of_x_elements.length; i++) {
    sum_xx += Math.pow(arr_of_x_elements[i],2)
  }
  return sum_xx
}

function getMultOfYElements(){

  var sum_yy = 0, arr_of_y_elements = getArrayOfY()
  for (var i = 0; i < arr_of_y_elements.length; i++) {
    sum_yy += Math.pow(arr_of_y_elements[i],2)
  }
  return sum_yy
}

function getMultOfXYElements(){

  var sum_xy = 0, arr_of_x_elements = getArrayOfX(), arr_of_y_elements = getArrayOfY()
  for (var i = 0; i < arr_of_x_elements.length; i++) {
    sum_xy += (arr_of_x_elements[i] * arr_of_y_elements[i])
  }
  return sum_xy
}

function getABCoefficients(){

  var coefs = {}
  var arr_of_x_elements = getArrayOfX()
  var n = arr_of_x_elements.length
  coefs.a = (n * getMultOfXYElements() - getSumOfXElements() * getSumOfYElements()) / (n * getMultOfXElements() - (getSumOfXElements() * getSumOfXElements()))
  coefs.b = (getSumOfYElements() * getMultOfXElements() - getSumOfXElements() * getMultOfXYElements()) / (n * getMultOfXElements() - (getSumOfXElements() * getSumOfXElements()))
  return coefs
}

function getAverageSumOfX(){

  var length = getArrayOfX().length
  var average_sum_of_x = getSumOfXElements()/length
  return average_sum_of_x
}

function getAverageSumOfY(){

  var length = getArrayOfY().length
  var average_sum_of_y = getSumOfYElements()/length
  return average_sum_of_y
}

function getAverageSumOfXY(){

  var length = getArrayOfX().length
  var average_sum_of_xy = getMultOfXYElements()/length
  return average_sum_of_xy
}

function getMathexpectationOfX(){

  var length = getArrayOfX().length, arr_of_x_elements = getArrayOfX(), mx = 0
  for (var i = 0; i < length; i++) {
    mx += (arr_of_x_elements[i] * (1/length))
  }
  return mx
}

function getMathexpectationOfY(){

  var length = getArrayOfY().length, arr_of_y_elements = getArrayOfY(), my = 0
  for (var i = 0; i < length; i++) {
    my += (arr_of_y_elements[i] * (1/length))
  }
  return my
}

function getDispersionOfX(){
  
  var length = getArrayOfX().length
  var dispersion_x = (getMultOfXElements()/length) - Math.pow(getAverageSumOfX(),2)
  return dispersion_x
}

function getDispersionOfY(){
  
  var length = getArrayOfY().length
  var dispersion_y = (getMultOfYElements()/length) - Math.pow(getAverageSumOfY(),2)
  return dispersion_y
}

function getStandardDeviationOfX(){

  var standard_deviation_x = Math.sqrt(getDispersionOfX())
  return standard_deviation_x
}

function getStandardDeviationOfY(){

  var standard_deviation_y = Math.sqrt(getDispersionOfY())
  return standard_deviation_y
}

function correlationCoefficient(){

  var cor_coeff = (getAverageSumOfXY() - (getAverageSumOfX() * getAverageSumOfY())) / (getStandardDeviationOfX() * getStandardDeviationOfY())
  return cor_coeff
}

function dispersoinUnbiasedEstimateOfX(){

  var length = getArrayOfX().length
  var dis_un_estimate_of_x = getDispersionOfX() * length / (length - 1)
  return dis_un_estimate_of_x
}

function dispersoinUnbiasedEstimateOfY(){

  var length = getArrayOfY().length
  var dis_un_estimate_of_y = getDispersionOfY() * length / (length - 1)
  return dis_un_estimate_of_y
}

function confidenceIntervalMOfX(){

  var length = getArrayOfX().length
  var confidence_interval_of_x = 1.967 * (getStandardDeviationOfX()/Math.sqrt(length))
  return confidence_interval_of_x
}

function confidenceIntervalMOfY(){

  var length = getArrayOfY().length
  var confidence_interval_of_y = 1.967 * (getStandardDeviationOfY()/Math.sqrt(length))
  return confidence_interval_of_y
}

function confidenceIntervalDUpOfX(){
  var length = getArrayOfX().length
  var interval_d_up_of_x = ((length - 1) * Math.pow(getStandardDeviationOfX(),2))/162.728
  return interval_d_up_of_x
}

function confidenceIntervalDDownOfX(){
  var length = getArrayOfX().length
  var interval_d_down_of_x = ((length - 1) * Math.pow(getStandardDeviationOfX(),2))/241.0579
  return interval_d_down_of_x
}

function confidenceIntervalDUpOfY(){
  var length = getArrayOfY().length
  var interval_d_up_of_y = ((length - 1) * Math.pow(getStandardDeviationOfY(),2))/162.728
  return interval_d_up_of_y
}

function confidenceIntervalDDownOfY(){
  var length = getArrayOfY().length
  var interval_d_down_of_y = ((length - 1) * Math.pow(getStandardDeviationOfY(),2))/241.0579
  return interval_d_down_of_y
}

function getTTable(){
  var length = getArrayOfX().length
  var t_table =((getAverageSumOfX() - getAverageSumOfY()) / Math.sqrt((length * getDispersionOfX()) + (length * getDispersionOfY()))) * ((length*length*(length * 2 - 2))/(length + 2))
  return t_table
}

function markerData(x, value){

  this.x = x
  this.value = value
}

function lineData (x, y){ 

  this.x = x
  this.y = y
}

function f (y){

  return getABCoefficients().a * y + getABCoefficients().b
}

function chartDraw(){

  var data_1 = [], data_2 = []
  var graph = 0
  var arr_of_x_elements = getArrayOfX(), arr_of_y_elements = getArrayOfY()
  
  if (graph < 1){
    for(var i = 0; i < arr_of_x_elements.length; i++){
      data_1[i] = new markerData(arr_of_x_elements[i], arr_of_y_elements[i])
    }
    for(var i = 0; i < 2; i++){
      data_2[i] = new markerData(i, f(i))
    }

    var chart = anychart.scatter()

    var series1 = chart.marker(data_1)
    var series2 = chart.line(data_2)

    series1.normal().fill("rgb(64,199,129)", 0.3)
    series2.stroke({color: "red", thickness: 2})

    chart.xGrid(true)
    chart.yGrid(true)

    chart.xGrid().stroke({color: "black", thickness: 0.5})
    chart.yGrid().stroke({color: "black", thickness: 0.5})

    chart.xMinorGrid(true)
    chart.yMinorGrid(true)

    chart.xMinorGrid().stroke({color: "black", thickness: 0.2})
    chart.yMinorGrid().stroke({color: "black", thickness: 0.2})

    chart.container("container")
    
    chart.draw()
    document.getElementById('out').innerHTML = "Now u can see a beautifull chart, u can press Show data! and see all parametrs."
    graph ++
  }
}

function consoleLog(){

  document.getElementById('out').innerHTML = "A: " + getABCoefficients().a.toFixed(5)
  document.getElementById('out1').innerHTML = "B: " + getABCoefficients().b.toFixed(5)
  document.getElementById('out2').innerHTML = "Correlation coefficient: " + correlationCoefficient().toFixed(5)
  document.getElementById('out3').innerHTML = "Regression equation: " + getABCoefficients().a.toFixed(5) + " * x + " + getABCoefficients().b.toFixed(5)
  document.getElementById('out4').innerHTML = "Confidence interval Math Expectation of x: (" + getAverageSumOfX().toFixed(3) + " - " + confidenceIntervalMOfX().toFixed(3) + " ; " + getAverageSumOfX().toFixed(3) + " + " + confidenceIntervalMOfX().toFixed(3) + " )"
  document.getElementById('out5').innerHTML = "Confidence interval Math Expectation of y: (" + getAverageSumOfY().toFixed(3) + " - " + confidenceIntervalMOfY().toFixed(3) + " ; " + getAverageSumOfY().toFixed(3) + " + " + confidenceIntervalMOfY().toFixed(3) + " )"
  document.getElementById('out6').innerHTML = "Confidence interval Dispersion of x: (" + confidenceIntervalDDownOfX().toFixed(3) + " ; " + confidenceIntervalDUpOfX().toFixed(3) + " )"
  document.getElementById('out7').innerHTML = "Confidence interval Dispersion of y: (" + confidenceIntervalDDownOfY().toFixed(3) + " ; " + confidenceIntervalDUpOfY().toFixed(3) + " )"
  document.getElementById('out8').innerHTML = "H0: Dx = Dy;  H1: Dx > Dy;" 
  document.getElementById('out9').innerHTML = "F observable : " + (dispersoinUnbiasedEstimateOfX()/dispersoinUnbiasedEstimateOfY()).toFixed(3)
  document.getElementById('out10').innerHTML = "F table : " + 1
  document.getElementById('out11').innerHTML = "Since the observed value of the Fisher criterion is greater than the table value, we can reject the hypothesis H0"
  document.getElementById('out12').innerHTML = "H0: M(x) = M(Y), H1: M(x) != M(Y)" 
  document.getElementById('out13').innerHTML = "T observable : " + getTTable().toFixed(3)
  document.getElementById('out14').innerHTML = "T table : " + 1.964
  document.getElementById('out15').innerHTML = "Since the observed value of the Student tutorial point distribution table is greater than the table value, we can reject the hypothesis H0"



  console.log("X elements: ")
  console.log(getArrayOfX())
  console.log("Y elements: ")
  console.log(getArrayOfY())

  console.log("A: ")
  console.log(getABCoefficients().a.toFixed(10))
  console.log("B: ")
  console.log(getABCoefficients().b.toFixed(10))

  console.log("Mathematical expectation of x elements: ")
  console.log(getMathexpectationOfX().toFixed(10))
  console.log("Mathematical expectation of y elements: ")
  console.log(getMathexpectationOfY().toFixed(10))

  console.log("Dispersion of x elements: ")
  console.log(getDispersionOfX().toFixed(10))
  console.log("Dispersion of y elements: ")
  console.log(getDispersionOfY().toFixed(10))


  console.log(dispersoinUnbiasedEstimateOfX())
  console.log(dispersoinUnbiasedEstimateOfY())
  console.log(dispersoinUnbiasedEstimateOfX()/dispersoinUnbiasedEstimateOfY())

  console.log("Correlation coefficient: ")
  console.log(correlationCoefficient().toFixed(10))
}