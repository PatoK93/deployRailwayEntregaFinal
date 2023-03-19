"# Tercera_Entrega_Node_JS_Railway"

-Comentarios-

1. Se contempla si el usuario es administrador, si el carrito le pertenece y si el mismo ya fue "comprado" o no.
2. Todo funciona logueado, asi que es indispensable estarlo para manejar las rutas.

-Deuda Técnica-

1. Se deja hacer SignUp de un usuario cuando se esta logueado, lo cual no es correcto, por lo que se debería validar esto.
2. Mejorar el tema del stock. En este momento, al ingresar un producto al carro o sacarlo, se le resta o suma del producto original, lo cual esta bien, pero, cuando se saca, se eliminan todos los productos con ese id se restituye la cantidad entera.
   Me gustaria que el usuario puede ingresar la cantidad que quiere y no ingresar, por ejemplo, tres objetos de un mismo producto, los cuales representan que el usuario agrego tres unidades. Además, que pueda sacar una unidad, sin sacar todas.
3. Mejorar la validacion de los campos que ingresa el usuario en productos por ejemplo.
4. No mostrar el stock en el carrito, sino que apilar los productos en uno solo y mostrar la cantidad a llevar. Cuando se saque uno solo retirar una unidad, o, mejor aun, dejar que el usuario eliga cuantas agregar y cuantas eliminar.
5. Hacer las rutas en Swagger.
6. Probar todo y arreglar lo que no ande.
7. Terminar de colocar y ajustar los cURLs a todos los endpoints.
