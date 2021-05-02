//import React from 'react'
var exerciseLog = [
    {date:'2019-07-02T21:18:48.946Z', description:'pull ups', duration: 90},
    {date:'2019-07-02T21:22:30.395Z', description:'push ups', duration: 90},
    {date:'2019-07-02T22:19:37.790Z', description:'push ups', duration: 50}
]
//console.log('before: ', exerciseLog)
//exerciseLog = exerciseLog.map(x => x.date.toLocaleDateString());
//exerciseLog = exerciseLog.map(x => x.date.toString());

//exerciseLog = exerciseLog.map(x => "description: " + x.description + ", duration: " + x.duration + ", date: " + x.date.toString());
//console.log('after: ', exerciseLog)

let cars = [
    {
      "color": "purple",
      "type": "minivan",
      "registration": new Date('2017-01-03'),
      "capacity": 7
    },
    {
      "color": "red",
      "type": "station wagon",
      "registration": new Date('2018-03-03'),
      "capacity": 5
    },
    {
        "color": "red",
        "type": "cabrio",
        "registration": new Date('2016-05-02'),
        "capacity": 2
      }
  ]

let car = {
    "color": "red",
    "type": "cabrio",
    "registration": new Date('2016-05-02'),
    "capacity": 2
  }

  //add an object at the beginning
  //cars.unshift(car);
  //cars.splice(0, 1, car);
  //console.log(cars);

  //--Array.find returns only one object
  //let car1 = cars.find(car => car.color === "red"); 
  //let car1 = cars.find(car => car.color === "red" && car.type === "cabrio");
  //console.log(car1)

  //ARRAY.FILTER
  let redCars = cars.filter(car => car.color === "red");
    //console.log(redCars);

  //Transform objects of an array - Array.map
  let sizes = cars.map(car => {
    if (car.capacity <= 3){
      return "small";
    }
    if (car.capacity <= 5){
      return "medium";
    }
    return "large";
  });
  //console.log(sizes);

  let carsProperties = cars.map(car => {
    let properties = {
      "capacity": car.capacity,
      "size": "large"
    };
    if (car.capacity <= 5){
      properties['size'] = "medium";
    }
    if (car.capacity <= 3){
      properties['size'] = "small";
    }
    return properties;
   });
   //console.log(carsProperties);


   const newdata = cars.map((i)=>({
    color1: i.color,
    capacity: i.capacity*2,
   }))
   //console.log(newdata)

//    const data = [
//     { foo: 1, bar: 2 }, 
//     { foo: 2, bar: 3 },
//     { foo: 3, bar: 4 },
//   ];
  
//   const increment = a => a + 1;
//   const result = data.map(o => ({ ...o, foo: increment(o.foo) }));
//   console.log(result);

  const data = [
    { foo: 1619019755168, bar: 2 }, 
    { foo: 1619019886601, bar: 3 },
    { foo: 1619020382562, bar: 4 },
  ];
  
  //const increment = a => new Date(a).toLocaleDateString();
  const increment = a => new Date(a).toISOString();
  const result = data.map(o => ({ ...o, foo: increment(o.foo) }));
  console.log(result);

// const data =[ 
// {
//     id: 100,
//     email: 'jack@dev.com0',
//     info: {
//         name1: 'Jack',
//         name2: 'carlos'
//     }
// },
// {
//     id: 101,
//     email: 'jack@dev.com1',
//     info: {
//         name1: 'Jack',
//         name2: 'carlos'
//     }
// },
// {
//     id: 102,
//     email: 'jack@dev.com2',
    
// }
// ]


// const newdata = data.map((i)=>({
//     id: i.id,
//     email: i.email,
//     info: (typeof i.info !=='undefined') ? i.info.name1 : '' 
// }))
// //const newdata=data
// console.log(newdata)



 
// var win = window,
//     doc = document,
//     docElem = doc.documentElement,
//     body = doc.getElementsByTagName('body')[0],
//     x = win.innerWidth || docElem.clientWidth || body.clientWidth,
//     y = win.innerHeight|| docElem.clientHeight|| body.clientHeight;
// alert(x + ' × ' + y);

