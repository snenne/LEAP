package com.bavostepbros.leap.domain.model;

import java.time.LocalDate;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
*
* @author Bavo Van Meel
*
*/
@Entity
@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Strategy {

    @Id
    @GeneratedValue
    @EqualsAndHashCode.Include
    @Column(name = "STRATEGYID")
    private Integer strategyId;

    @OneToOne
    @JoinColumn
    private Status status;
    
    @Column(name = "STRATEGYNAME")
    private String strategyName;

    @Column(name = "TIMEFRAMESTART")
    private LocalDate timeFrameStart;
    
    @Column(name = "TIMEFRAMEEND")
    private LocalDate timeFrameEnd;

    @ManyToOne
    @JoinColumn(name = "ENVIRONMENTID", nullable = false)
    private Environment environment;

    @OneToMany(mappedBy = "strategy")
    private List<StrategyItem> items;

    public Strategy(Status status, String strategyName, LocalDate timeFrameStart, 
    		LocalDate timeFrameEnd, Environment environment) {
        this.status = status;
        this.strategyName = strategyName;
        this.timeFrameStart = timeFrameStart;
        this.timeFrameEnd = timeFrameEnd;
        this.environment = environment;
    }
    
    public Strategy(Integer strategyId, Status status, String strategyName, LocalDate timeFrameStart,
			LocalDate timeFrameEnd, Environment environment) {
		this.strategyId = strategyId;
		this.status = status;
		this.strategyName = strategyName;
		this.timeFrameStart = timeFrameStart;
		this.timeFrameEnd = timeFrameEnd;
		this.environment = environment;
	}

}