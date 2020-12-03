class Pregunta {
    constructor(pregunta){
        this.pregunta = pregunta;
        this.scores = [];
        this.puntajeMomento = 0;
        this.totalPuntajes = 0;
    }

    render = () => {
        let component = document.createElement('div');

        component.className = 'nuevaPregunta';

        let database = firebase.database();

        database.ref('Puntajes').on('value', (data)  =>{
            data.forEach(element => {
                let value = element.val();

                if(value.uid === this.pregunta.id){
                    this.scores.push(value.descrPuntaje);
                }
            });

            this.scores.forEach(
                element =>{
                    this.puntajeMomento += parseInt(element);
                }
            );

            this.totalPuntajes = this.scores.length;

            let promedio = this.puntajeMomento/this.totalPuntajes;

            let score = document.createElement('p');
            score.innerHTML = promedio;
    
    
        });

        let descripcion = document.createElement('p');
        descripcion.innerHTML = this.pregunta.DescrQuestion;

        //eliminar

        let deleteBtn = document.createElement('button');
        deleteBtn.className = 'deleteBtn';
        deleteBtn.innerHTML = 'X';

        component.appendChild(descripcion);
        component.appendChild(deleteBtn);

        //elimino tarea
        deleteBtn.addEventListener('click', () => {
            if(this.pregunta.estado === 'actual'){
                database.ref('Preguntas/' + this.pregunta.id).set(
                    {
                        id: this.pregunta.id,
                        DescrQuestion: this.pregunta.DescrQuestion,
                        estado : 'historico',
                    }
                
                );

            } else {
                database.ref('Preguntas/' + this.pregunta.id).set(null);
            }
        });
        
        return component;

    }
}