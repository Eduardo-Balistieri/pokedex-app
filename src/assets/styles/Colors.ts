type ColorsObject = {
   [key: string]: string
}

const colors: ColorsObject = {
   green: '#56D3B6',
   red: '#FC7E7E',
   blue: '#76BDFE',
   yellow: '#FFDC7D',
   white: '#DDDDEE',
   brown: '#C79C85',
   purple: '#997EFC',
   pink: '#EDA4DC',
   gray: '#757575',
   black: '#414141'
}

export const getColor = (color: string): string => {
   const requestedColor = colors[color] as string | undefined

   if (!requestedColor)
      return colors.gray

   return requestedColor
}
