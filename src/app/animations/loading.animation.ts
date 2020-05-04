import { trigger, style, animate, query, stagger, transition } from '@angular/animations';

export const loadingAnimation = function(){
    return trigger('loading',[/*Tansiciones que forma parte de la animacion */
        transition('* => *',[
            query(':leave', [
                stagger(100, [
                    animate('350ms', style({ opacity: 0 }))
                ])
            ], { optional: true }),
            query(':enter',[
                style({opacity:0}),
                stagger(100,[
                    animate('350ms',style({opacity:1}))
                ])
            ],{optional:true})
        ])
    ]);
}
