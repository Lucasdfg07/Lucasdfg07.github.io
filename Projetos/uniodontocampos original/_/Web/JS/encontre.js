$('#frmSearchByName').submit(function (event) {
	event.preventDefault();
	const nome = $('#fNome').val().toUpperCase();
	$('.dentistas').each(function () {
		const doctor = $(this).find('.doctor-name').text();
		if (doctor.indexOf(nome) !== -1) {
			$(this).show();
		} else {
			$(this).hide();
		}	
	});
});

const resetDoctors = function () {
	$('.dentistas').each(function () {
		$(this).show();
	});
};

$('#fBusca2Reset').click(function () {
	resetDoctors();
});

$('#frmMainSearch').submit(function (event) {
	
	event.preventDefault();
	resetDoctors();
	const especialidade = $('#fEspecialidade').val();
	const cidade = $('#fCidade').val();
	$('.dentistas').each(function () {
		const address = $(this).find('.address').text();
		const especialidadeText = $(this).find('.especialidade').text();
		
		const stat1 = especialidadeText.indexOf(especialidade) !== -1 || especialidade === 'Todas';
		const stat2 = address.indexOf(cidade) !== -1 || cidade === 'Todas';
		
		if (stat1 && stat2) {
			$(this).show();
		} else {
			$(this).hide();
		}
	});
});
 
