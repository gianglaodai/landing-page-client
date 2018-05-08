// import { Pipe, PipeTransform } from '@angular/core';

// @Pipe({
//   name: 'joinStyle',
//   // pure: false
// })
// export class JoinStylePipe implements PipeTransform {

//   transform(styles: any, args?: any): any {
//     const result = {};
//     Object.keys(styles).forEach(key => {
//       result[JSON.parse(JSON.stringify(key))] = JSON.parse(JSON.stringify(styles[key]));
//     });
//     args.forEach(arr => {
//       Object.keys(arr).forEach(key => {
//         result[JSON.parse(JSON.stringify(key))] = JSON.parse(JSON.stringify(arr[key]));
//       });
//     });
//     // if (styles) {
//     //   args.forEach(objStyle => {

//     //   });
//     //   args.forEach(objStyle => {
//     //     result[objStyle[0]] = objStyle[1];
//     //     Object.entries(objStyle).forEach(property => {
//     //       styles[property[0]] = property[1];
//     //     });
//     //   });
//     // }
//     return result;
//   }

// }
