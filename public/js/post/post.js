class Post {
  constructor () {
      this.db = firebase.firestore()
      this.db.settings({})
  }

  crearPost (uid, emailUser, titulo, descripcion, imagenLink, videoLink) {
    return this.db
        .collection('posts')
        .add({
            uid: uid,
            autor: emailUser,
            titulo: titulo,
            descripcion: descripcion,
            imagenLink: imagenLink,
            videoLink: videoLink,
            fecha: firebase.firestore.FieldValue.serverTimestamp()
        })
        .then(refDoc => {
            console.log(`Created post identfier ${refDoc.id}`)
        })
        .catch(err => {
            console.error(`Error creating post ${err}`)
        })
  }

  consultarTodosPost () {
    this.db
        .collection('posts')
        .orderBy('fecha', 'asc')
        .orderBy('titulo', 'asc')
        .onSnapshot(querySnapshot => {
            $('#posts').empty()
            if (querySnapshot.empty) {
                $('#posts').append(this.obtenerTemplatePostVacio())
            } else {
                querySnapshot.forEach(post => {
                    let postHtml = this.obtenerPostTemplate(
                        post.data().autor,
                        post.data().titulo,
                        post.data().descripcion,
                        post.data().videoLink,
                        post.data().imagenLink,
                        Utilidad.obtenerFecha(post.data().fecha.toDate())
                    )
                    $('#posts').append(postHtml)
                })
            }
        })
  }

  consultarPostxUsuario (emailUser) {
    this.db
      .collection('posts')
      .orderBy('fecha', 'asc')
      .orderBy('titulo', 'asc')
      .where('autor', '==', emailUser)
      .onSnapshot(querySnapshot => {
        $('#posts').empty()
        if (querySnapshot.empty) {
          $('#posts').append(this.obtenerTemplatePostVacio())
        } else {
          querySnapshot.forEach(post => {
            let postHtml = this.obtenerPostTemplate(
              post.data().autor,
              post.data().titulo,
              post.data().descripcion,
              post.data().videoLink,
              post.data().imagenLink,
              Utilidad.obtenerFecha(post.data().fecha.toDate())
            )
            $('#posts').append(postHtml)
          })
        }
      })
  }

  obtenerTemplatePostVacio () {
    return `<article class="post">
      <div class="post-titulo">
          <h5>Crea el primer Post a la comunidad</h5>
      </div>
      <div class="post-calificacion">
          <a class="post-estrellita-llena" href="*"></a>
          <a class="post-estrellita-llena" href="*"></a>
          <a class="post-estrellita-llena" href="*"></a>
          <a class="post-estrellita-llena" href="*"></a>
          <a class="post-estrellita-vacia" href="*"></a>
      </div>
      <div class="post-video">
          <iframe type="text/html" width="500" height="385" src='https://www.youtube.com/embed/bTSWzddyL7E?ecver=2'
              frameborder="0"></iframe>
          </figure>
      </div>
      <div class="post-videolink">
          Video
      </div>
      <div class="post-descripcion">
          <p>Crea el primer Post a la comunidad</p>
      </div>
      <div class="post-footer container">         
      </div>
  </article>`
  }

  obtenerPostTemplate (
    autor,
    titulo,
    descripcion,
    videoLink,
    imagenLink,
    fecha
  ) {
    if (imagenLink) {
      return `<article class="post">
            <div class="post-titulo">
                <h5>${titulo}</h5>
            </div>
            <div class="post-calificacion">
                <a class="post-estrellita-llena" href="*"></a>
                <a class="post-estrellita-llena" href="*"></a>
                <a class="post-estrellita-llena" href="*"></a>
                <a class="post-estrellita-llena" href="*"></a>
                <a class="post-estrellita-vacia" href="*"></a>
            </div>
            <div class="post-video">                
                <img id="imgVideo" src='${imagenLink}' class="post-imagen-video" 
                    alt="Imagen Video">     
            </div>
            <div class="post-videolink">
                <a href="${videoLink}" target="blank">Ver Video</a>                            
            </div>
            <div class="post-descripcion">
                <p>${descripcion}</p>
            </div>
            <div class="post-footer container">
                <div class="row">
                    <div class="col m6">
                        Fecha: ${fecha}
                    </div>
                    <div class="col m6">
                        Autor: ${autor}
                    </div>        
                </div>
            </div>
        </article>`
    }

    return `<article class="post">
                <div class="post-titulo">
                    <h5>${titulo}</h5>
                </div>
                <div class="post-calificacion">
                    <a class="post-estrellita-llena" href="*"></a>
                    <a class="post-estrellita-llena" href="*"></a>
                    <a class="post-estrellita-llena" href="*"></a>
                    <a class="post-estrellita-llena" href="*"></a>
                    <a class="post-estrellita-vacia" href="*"></a>
                </div>
                <div class="post-video">
                    <iframe type="text/html" width="500" height="385" src='${videoLink}'
                        frameborder="0"></iframe>
                    </figure>
                </div>
                <div class="post-videolink">
                    Video
                </div>
                <div class="post-descripcion">
                    <p>${descripcion}</p>
                </div>
                <div class="post-footer container">
                    <div class="row">
                        <div class="col m6">
                            Fecha: ${fecha}
                        </div>
                        <div class="col m6">
                            Autor: ${autor}
                        </div>        
                    </div>
                </div>
            </article>`
  }
}
