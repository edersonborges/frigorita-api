export function serializeBigInt(obj: any): any {
    const serializedObj = JSON.parse(JSON.stringify(obj, (key, value) =>
        typeof value === 'bigint' ? value.toString() : value
    ));

    // Verifica se o objeto tem a chave "message" e retorna o valor diretamente
    if (serializedObj && typeof serializedObj === 'object' && 'message' in serializedObj) {
        return serializedObj.message;
    }

    return serializedObj;
}
