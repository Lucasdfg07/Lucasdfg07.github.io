class OutrosPdf < Prawn::Document
  def initialize(relatorio, current_user)
    super(top_margin: 70)
    @relatorio = relatorio
      fill_color "40464e"
      font "Courier"

      text "Termo de Compromisso de Estágio - TCE", align: :center, size: 24
      move_down 20
      text "Apólice de seguro nº 060982.001.2427, de 13/12/2016",align: :center
      text "Seguradora: Empresa MBM SEGURADORA S.A",align: :center

      @relatorio.each do |relatorio|
        if(relatorio.matricula_aluno == current_user.matricula)
          move_down 30
          text "<b>O INSTITUTO FEDERAL FLUMINENSE</b>, inscrito no CNPJ/MF sob o nº 10.779.511/0001-07, Rua Dr Siqueira nº 273 - Parque Dom Bosco - Campos dos
          Goytacazes/RJ CEP: 28.030-130, neste Ato representando a Insituição de Ensino <b>PROMOTORA</b> na pessoa do Sr. Reitor JEFFERSON MANHÃES DE AZEVEDO, com a parceria firmada com a ", align: :justify, :inline_format => true, :leading => 10

          move_down 10
          text "<u>#{relatorio.parceria_firmada_com}</u>", align: :center, :inline_format => true, size:11
          move_down 15

          text "(município de Campos dos Goytacazes) vem, Instituição de Ensino <b>CONCEDENTE</b> do Estágio Curricular Supervisionado dos Cursos Superiores de Licenciatura, denominada <u>#{relatorio.denominada_estagio}</u> no CNPJ Nº <u>#{relatorio.CNPJ_estagio}</u>, situado na rua <u>#{relatorio.rua_estagio}</u>, nº <u>#{relatorio.numero_estagio}</u>, no bairro <u>#{relatorio.bairro_estagio}</u>, no município de <u>#{relatorio.municipio_estagio}</u>, telefone <u>#{relatorio.telefone_estagio}</u>, representado por <u>#{relatorio.representado_por}</u>, para fins de abertura de campo de Estágio, no período letivo de <u>#{relatorio.periodo_letivo}</u> com o <b>LICENCIANDO</b> <u>#{current_user.nome}</u>, matriculado sob o nº <u>#{current_user.matricula}</u>, no <u>#{current_user.periodo}</u> período do ano letivo de <u>#{relatorio.ano}</u>, no Curso Superior de Licenciatura em <u>#{current_user.licenciatura}</u>, residente na <u>#{relatorio.endereco}</u>, bairro <u>#{relatorio.bairro}</u>, município <u>#{relatorio.municipio}</u>, Estado do <u>#{relatorio.estado}</u>, CEP.: <u>#{relatorio.CEP}</u>, nos termos da Lei Nº 11.788 de 25/09/2008, cujas cláusulas constam e regem o presente contrato:", align: :justify, :inline_format => true, :leading => 10
          move_down 30
          text "Período de <u>#{relatorio.periodo_de}</u>", align: :justify, :inline_format => true
        end
      end
  end
end
