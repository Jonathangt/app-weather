import { trigger, state, style, transition, animate, query, stagger } from "@angular/animations";

export const showUpStaggered = trigger('showUpCollection',[
    transition('* => *',[
        query(':enter',[
            style({ opacity: 0, transform: 'scaleY(0)' }),
            stagger(70,[
                animate(300, style({ opacity: 1, transform: 'scaleY(1)' }))    
            ])            
        ],{optional: true})
    ])
])

export const showUp = trigger('showUpElement',[
    state('in',style({ opacity: 1, transform: 'scaleY(1)' })),/*Se pasa los estilos para cuando el componente se muestre */
    transition(':enter',[
        style({opacity: 0, transform:'scaleY(0)'}),
        animate(250)
    ])
]);