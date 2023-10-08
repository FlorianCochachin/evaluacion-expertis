Feature: Procesar deducible

    Scenario Outline: Póliza con deducible texto plano
        Given la póliza tiene un deducible en forma del <texto>
        When ejecutamos el conversor de deducible
        Then obtenemos la parametrización del deducible en <detalle>

        Examples:
            | texto           | detalle          |
            | D22Request      | D22Response      |
            | D85Request      | D85Response      |
            | D10Request      | D10Response      |
            | D86Request      | D86Response      |
            | D88Request      | D88Response      |
            | D314Request     | D314Response     |
