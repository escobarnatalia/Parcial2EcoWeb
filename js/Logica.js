const ActualQuestion = document.getElementById('ActualQuestion');
const Puntaje = document.getElementById('Puntaje');

const DescrQuestion = document.getElementById('DescrQuestion');
const agregarBtn = document.getElementById('AgregarBtn');

const QuestionContainer = document.getElementById('QuestionsContainer');
const database = firebase.database();

const agregar = () =>{
    if (DescrQuestion.value === '') {
        alert('Debe agregar una tarea');
        return;
    }

    let referencia = database.ref('Preguntas').push();
    let question = {
        id: referencia.key,
        DescrQuestion: DescrQuestion.value,
        estado : 'actual',
    }

    referencia.set(question);
    DescrQuestion.value = '';

}

agregarBtn.addEventListener('click',agregar);

//lectura
database.ref('Preguntas').on('value', function (data) {
    ActualQuestion.innerHTML = '';
    QuestionContainer.innerHTML = '';

    data.forEach(
        element => {
        let value = element.val();
        let pregunta = new Pregunta(value);

        if(element.val().estado === "actual"){
            ActualQuestion.appendChild(pregunta.render());
        } else {
            QuestionContainer.appendChild(pregunta.render());
        }
    });
})