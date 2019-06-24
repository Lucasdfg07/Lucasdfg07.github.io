class NaoformalPdf < Prawn::Document
  def initialize(relatorio, current_user, usuario_matricula)
    super(top_margin: 70)
    @relatorio = relatorio
    @usuario_matricula = usuario_matricula
      fill_color "40464e"
      font "Courier"

      text "Termo de Compromisso de Estágio - TCE", align: :center, size: 24
      move_down 20
      text "Apólice de seguro nº 060982.001.2427, de 13/12/2016",align: :center
      text "Seguradora: Empresa MBM SEGURADORA S.A",align: :center

      @relatorio.each do |relatorio|
        if(relatorio.matricula_aluno == @usuario_matricula)
          move_down 30
          text "<b>O INSTITUTO FEDERAL FLUMINENSE</b>, inscrito no CNPJ/MF sob o nº 10.779.511/0001-07 Rua Dr Siqueira nº 273 - Parque Dom Bosco - Campos dos Goytacazes/RJ CEP: 28.030-130, neste Ato representando a Insituição de Ensino <b>PROMOTORA</b>, neste Ato representado por seu Reitor JEFFERSON MANHÃES DE AZEVEDO, firma parceria com a instituição de ensino <b>CONCEDENTE</b> do Estágio Curricular Supervisionado, ", align: :justify, :inline_format => true, :leading => 10

          move_down 10
          text "<b><u>#{relatorio.denominada_estagio}</u></b>", align: :center, :inline_format => true, size:12
          move_down 25

          text "inscrita no CNPJ/MF sob o Nº <u>#{relatorio.CNPJ_estagio}</u>, situada na Rua <u>#{relatorio.rua_estagio}</u>, bairro <u>#{relatorio.bairro_estagio}</u>, município <u>#{relatorio.municipio_estagio}</u>, UF <u>#{relatorio.estado_estagio}</u>, CEP <u>#{relatorio.cep_estagio}</u>, telefone <u>#{relatorio.telefone_estagio}</u>, representada por <u>#{relatorio.representado_por}</u>, para fins de abertura de campo de Estágio ao <b>LICENCIANDO</b>, <u>#{relatorio.nome}</u>, matriculado sob o nº <u>#{relatorio.matricula_aluno}</u>, no <u>#{relatorio.periodo}</u> período do ano letivo de <u>#{relatorio.ano}</u>, no Curso Superior de Licenciatura em <u>#{relatorio.licenciatura}</u>, residente na Rua <u>#{relatorio.endereco}</u>, Nº <u>#{relatorio.numero}</u>, bairro <u>#{relatorio.bairro}</u>, município <u>#{relatorio.municipio}</u>, Estado do <u>#{relatorio.estado}</u>, nos termos da Lei Nº 11.788 de 25/09/2008, cujas cláusulas constam e regem o presente contrato:", align: :justify, :inline_format => true, :leading => 10
          move_down 30
          text "Período de <u>#{relatorio.periodo_de}</u> a <u>#{relatorio.periodo_a}</u>", align: :justify, :inline_format => true
        end
      end
  end
end
