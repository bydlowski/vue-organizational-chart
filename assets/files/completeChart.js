const levels = [
  {
    name: 'João Carlos',
    position: 'CEO',
    elements: [
      {
        name: 'Roberta',
        position: 'VP Finanças',
        elements: [
          {
            name: 'João',
            position: 'VP Vendas',
            elements: []
          },
          {
            name: 'Carlos',
            position: 'VP Vendas',
            elements: []
          },
          {
            name: 'Roberta',
            position: 'VP Vendas',
            elements: [
              {
                name: 'XXX',
                position: 'VP Vendas'
              },
              {
                name: 'YYY',
                position: 'VP Vendas'
              },
              {
                name: 'ZZZ',
                position: 'VP Vendas'
              }
            ]
          }
        ]
      },
      {
        name: 'Claudio',
        position: 'VP Marketing',
        elements: []
      },
      {
        name: 'Marcos',
        position: 'VP Vendas',
        elements: [
          {
            name: 'Paulo',
            position: 'VP Vendas',
            elements: [
              {
                name: 'Paulo II',
                position: 'VP Vendas'
              }
            ]
          },
          // {
          //   name: 'Andre',
          //   position: 'VP Vendas',
          //   elements: [
          //     {
          //       name: 'XXX',
          //       position: 'VP Vendas'
          //     },
          //     {
          //       name: 'YYY',
          //       position: 'VP Vendas'
          //     },
          //     {
          //       name: 'ZZZ',
          //       position: 'VP Vendas'
          //     }
          //   ]
          // },
          {
            name: 'José',
            position: 'VP Vendas',
            elements: []
          },
          {
            name: 'Alberto',
            position: 'VP Vendas',
            elements: []
          },
          // {
          //   name: 'Caio',
          //   position: 'VP Vendas',
          //   elements: []
          // },
          // {
          //   name: 'Nelson',
          //   position: 'VP Vendas',
          //   elements: []
          // }
        ]
      },
      {
        name: 'Wilson',
        position: 'VP RH',
        elements: [
          {
            name: 'Fabio',
            position: 'VP Vendas',
            elements: []
          },
          {
            name: 'Bruno',
            position: 'VP Vendas',
            elements: []
          },
        ]
      }
    ],
  }
]

export default levels