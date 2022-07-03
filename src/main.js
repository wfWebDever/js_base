import React, { useState } from 'react'
// import Libss from './libsss'
import('./libsss').then(() => {
  console.log('libss', 'done')
})
console.log('test ', 'webpack ')
console.log(React, useState)
