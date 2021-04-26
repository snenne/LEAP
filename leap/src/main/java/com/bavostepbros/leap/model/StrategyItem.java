package com.bavostepbros.leap.model;

@Entity
public class StrategyItem {

    @Id
    @GeneratedValue
    private Integer itemId;

    @ManyToOne
    private Strategy strategy;

    private String strategyItemName;

    @Type(type="text")
    private String description;


    public StrategyItem(Strategy strategy, String strategyItemName, String description) {
        this.strategy = strategy;
        this.strategyItemName = strategyItemName;
        this.description = description;
    }

    public Integer getItemId() {
        return this.itemId;
    }

    public void setItemId(Integer itemId) {
        this.itemId = itemId;
    }

    public Strategy getStrategy() {
        return this.strategy;
    }

    public void setStrategy(Strategy strategy) {
        this.strategy = strategy;
    }

    public String getStrategyItemName() {
        return this.strategyItemName;
    }

    public void setStrategyItemName(String strategyItemName) {
        this.strategyItemName = strategyItemName;
    }

    public String getDescription() {
        return this.description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public String toString() {
        return "{" +
            " itemId='" + getItemId() + "'" +
            ", strategy='" + getStrategy() + "'" +
            ", strategyItemName='" + getStrategyItemName() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }

}