<?php

use Slim\Http\Request;
use Slim\Http\Response;
// Routes

/*$app->get('/[{name}]', function (Request $request, Response $response, array $args) {
    // Sample log message
    $this->logger->info("Slim-Skeleton '/' route");

    // Render index view
    return $this->renderer->render($response, 'index.phtml', $args);
});*/

$app->get('/', function (Request $request, Response $response, array $args) {
    return $this->view->render($response, 'acceso.html');
});

$app->get('/pedido', function (Request $request, Response $response, array $args) {
    return $this->view->render($response, 'pedido.html');
});

$app->get('/imprimir/{tipo:[01|03|PR|TK]+}', function (Request $request, Response $response, array $args) {
    $this->printer->imprimir($args["tipo"], null);
    return $response->withJson(array("success" => true));
});
