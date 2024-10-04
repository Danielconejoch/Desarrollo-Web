// Función para verificar el número de caracteres
function verificar(control, max, progressText) {
  if (control.value.length > max) {
    control.value = control.value.substring(0, max);
  }
  const remaining = max - control.value.length;
  progressText.textContent = `Usted tiene un espacio de ${remaining} caracteres restantes.`;
}
